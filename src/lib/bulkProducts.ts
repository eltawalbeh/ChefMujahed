import * as XLSX from 'xlsx'
import type { CatalogCategory } from '@/data/catalog'

export type BulkProductRow = {
  nameAr: string
  sku: string
  channel: 'B2C' | 'B2B' | 'BOTH' | string
  categorySlug?: string
  shortDescriptionAr?: string
  longDescriptionAr?: string
  basePriceJod?: string
  availability?: string
  status?: string
  publicVisible?: boolean
  b2bAllowCustomUnit?: boolean
  units?: Array<{ label: string; channel?: string; sortOrder?: number }>
  imageUrl?: string
  slug?: string
}

const headers = {
  nameAr: ['الاسم', 'اسم المنتج', 'name', 'name_ar'],
  sku: ['SKU', 'sku'],
  channel: ['القناة', 'channel'],
  categorySlug: ['التصنيف', 'category_slug', 'category'],
  shortDescriptionAr: ['الوصف المختصر', 'short_description_ar', 'short_description'],
  longDescriptionAr: ['الوصف الكامل', 'long_description_ar', 'long_description'],
  basePriceJod: ['السعر الأساسي JOD', 'base_price_jod', 'price'],
  availability: ['التوفر', 'availability'],
  status: ['الحالة', 'status'],
  publicVisible: ['ظاهر للعامة', 'public_visible'],
  b2bAllowCustomUnit: ['وحدة مخصصة B2B', 'b2b_allow_custom_unit'],
  units: ['الوحدات', 'units'],
  imageUrl: ['رابط الصورة', 'image_url'],
  slug: ['Slug', 'slug'],
} as const

function pick(row: Record<string, any>, names: readonly string[]) {
  for (const name of names) if (row[name] != null) return String(row[name]).trim()
  return ''
}

function bool(value: string) {
  return ['1', 'true', 'yes', 'y', 'نعم', 'صح'].includes(value.trim().toLowerCase())
}

export async function parseBulkProductFile(file: File): Promise<BulkProductRow[]> {
  const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' })
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  const raw = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, { defval: '' })
  return raw
    .map((row) => {
      const unitValue = pick(row, headers.units)
      const result: BulkProductRow = {
        nameAr: pick(row, headers.nameAr),
        sku: pick(row, headers.sku),
        channel: pick(row, headers.channel).toUpperCase(),
      }
      const optional = {
        categorySlug: pick(row, headers.categorySlug),
        shortDescriptionAr: pick(row, headers.shortDescriptionAr),
        longDescriptionAr: pick(row, headers.longDescriptionAr),
        basePriceJod: pick(row, headers.basePriceJod),
        availability: pick(row, headers.availability).toUpperCase(),
        status: pick(row, headers.status).toUpperCase(),
        imageUrl: pick(row, headers.imageUrl),
        slug: pick(row, headers.slug),
      }
      for (const [key, value] of Object.entries(optional)) if (value !== '') (result as any)[key] = value
      const publicVisible = pick(row, headers.publicVisible)
      const customUnit = pick(row, headers.b2bAllowCustomUnit)
      if (publicVisible !== '') result.publicVisible = bool(publicVisible)
      if (customUnit !== '') result.b2bAllowCustomUnit = bool(customUnit)
      if (unitValue) result.units = unitValue.split('|').map((label, index) => ({ label: label.trim(), channel: result.channel, sortOrder: index + 1 })).filter((unit) => unit.label)
      return result
    })
    .filter((row) => row.nameAr || row.sku)
}

export function downloadBulkProductTemplate(categories: CatalogCategory[]) {
  const products = XLSX.utils.json_to_sheet([
    {
      'الاسم': 'مثال منتج',
      'SKU': 'SKU-001',
      'القناة': 'BOTH',
      'التصنيف': categories[0]?.slug ?? '',
      'الوصف المختصر': '',
      'الوصف الكامل': '',
      'السعر الأساسي JOD': '0.000',
      'التوفر': 'AVAILABLE',
      'الحالة': 'DRAFT',
      'ظاهر للعامة': 'نعم',
      'وحدة مخصصة B2B': 'لا',
      'الوحدات': 'قطعة|علبة',
      'رابط الصورة': '',
      'Slug': '',
    },
  ])
  const categorySheet = XLSX.utils.json_to_sheet(categories.map((category) => ({ 'اسم التصنيف': category.label, 'Slug المطلوب في الاستيراد': category.slug })))
  const instructions = XLSX.utils.aoa_to_sheet([
    ['تعليمات'],
    ['SKU مطلوب وهو المفتاح المستخدم لتحديث المنتج الموجود أو إنشاء منتج جديد.'],
    ['القناة: B2C أو B2B أو BOTH.'],
    ['التوفر: AVAILABLE أو UNAVAILABLE أو SEASONAL.'],
    ['الحالة: DRAFT أو ACTIVE أو INACTIVE أو ARCHIVED.'],
    ['الوحدات تكتب مفصولة بعلامة | مثل: قطعة|علبة|كيلو.'],
    ['المنتجات التي تحمل SKU موجوداً سيتم تحديثها بعد المعاينة والموافقة.'],
  ])
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, products, 'Products')
  XLSX.utils.book_append_sheet(workbook, categorySheet, 'Categories')
  XLSX.utils.book_append_sheet(workbook, instructions, 'Instructions')
  XLSX.writeFile(workbook, 'chef-mujahed-products-template.xlsx')
}
