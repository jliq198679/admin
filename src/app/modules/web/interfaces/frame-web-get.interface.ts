import { PayloadFrameType } from "../types";
import { FrameWebInterface } from "./frame-web.interface";

export interface FrameWebGetInterface extends FrameWebInterface {
    payload_frame: PayloadFrameType;
}