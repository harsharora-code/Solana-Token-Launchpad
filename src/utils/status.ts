import { Launch } from "@prisma/client";

export function  getLaunchStatus( 
    launch: Launch,
    purchased: Number

): string {

    const now = new Date();
    if(purchased >= launch.totalSupply) {
        return "SOLD_OUT"
    }
 if (now < launch.startAt) {
    return "UPCOMING"
  }

  if (now > launch.endAt) {
    return "ENDED"
  }
     return "ACTIVE"
}
    
