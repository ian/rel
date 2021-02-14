import Geo from "./geo"
import PhoneNumber from "./phoneNumber"
import String from "./string"

export default {
  geo: () => new Geo(),
  phoneNumber: () => new PhoneNumber(),
  string: () => new String(),
}
