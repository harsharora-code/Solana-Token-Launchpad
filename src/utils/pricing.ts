import {Tier} from "@prisma/client"
export function calculateCost(
    amount : number,
    tiers: Tier[],
    basePrice: number
) {
    if(!tiers || tiers.length == 0) {
        return amount * basePrice;
    }

    let remaining  = amount;
    let cost =  0;
    for(const tier of tiers) {
        const capacity = tier.maxAmount - tier.minAmount;

        const used  = Math.min(remaining, capacity);
        cost += used * tier.pricePerToken;
      remaining -= used


      if(remaining <= 0)  break;
    }

      if(remaining >= 0) {
        cost = cost + remaining * basePrice;

      }
      return cost;

    }

