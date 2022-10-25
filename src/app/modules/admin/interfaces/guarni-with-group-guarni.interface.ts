import { GroupGuarniInterface } from "./group-guarni.Interface";
import { GuarniInterface } from "./guarni.Interface";

export interface GuarniWithGroupGuarniInterface extends GuarniInterface {
  type_side_dish: GroupGuarniInterface;
}
