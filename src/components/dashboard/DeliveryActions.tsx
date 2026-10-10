import type { RequestStatus } from '@/types/request'
import Button from '@/components/ui/Button'

type DeliveryActionsProps = {
  status: RequestStatus
  busy?: boolean
  onChange: (status: RequestStatus) => void
}

export default function DeliveryActions({ status, busy, onChange }: DeliveryActionsProps) {
  if (status === 'READY') return <Button size="sm" disabled={busy} onClick={() => onChange('OUT_FOR_DELIVERY')}>إرسال للتوصيل</Button>
  if (status === 'OUT_FOR_DELIVERY') return <Button size="sm" disabled={busy} onClick={() => onChange('COMPLETED')}>تأكيد التسليم</Button>
  return null
}
