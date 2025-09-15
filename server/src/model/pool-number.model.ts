export class PoolNumber {
  pool_number   :number = 0
  lane_time     :string = '0000-00-00'
  call_time     :string | null  = null
  recall_time   :string | null  = null
  send_time     :string | null  = null
  exit_time     :string | null  = null
  gone_time     :string | null  = null
}