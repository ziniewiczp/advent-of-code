class Planet {
    constructor(name, prev) {
        this.name = name;
        this.prev = prev;
    }
}

function parseInput() {
    const input = "ZR5)FZS,WCY)ZB3,NXV)8ZY,CMN)CLW,4XG)8VX,M8S)4F5,QWB)7WM,JG4)VPL,JG3)ZPC,VKR)KF7,WH8)8RS,CNS)D71,P3L)6SK,CXM)HSV,9JX)D4R,L25)4ZM,C97)CNS,7R9)H6M,XPT)QVX,VMQ)9M2,8C4)8F8,MFN)WZF,HP9)PBG,L36)BH1,CHP)HP9,MJ3)783,48Y)BJM,R4X)BPZ,PSY)6FM,HD5)FJX,D8M)HLW,49J)KLD,LZ4)7BZ,3LZ)TR5,NHB)WXK,DMQ)Y2R,W8S)GD7,D71)T11,GZ5)N75,CLW)W46,7XW)C8R,CS2)QS7,BTP)2MZ,H5Y)JCB,DCX)XK1,BFZ)B1C,JCJ)YBJ,1D4)TSW,SVG)97P,LVD)FQN,FY3)Q6R,9MD)YLC,5YN)NJ2,8RL)13T,3ZT)4SG,CJ6)X6D,1NV)JCJ,35N)R8N,VL7)M78,NJ2)7H8,JQG)VL7,3CF)T2M,NZ5)ZGQ,7WX)KFR,YVS)6NH,ZDS)17X,KZN)VX8,T6M)FSJ,11S)3PN,YDK)G4Y,N7S)3ZK,7QN)35N,MC9)ZDR,2Z1)LY7,DWY)WDS,ZV1)PTW,5R4)PWJ,8GR)8LH,WF5)3K5,JS8)YQQ,2CD)ZC2,XSN)NX5,LY7)382,GC2)1YF,8LF)SV1,NNB)QWB,BDW)G8N,WSD)5NN,2MZ)VBP,V6L)Z4Y,7H8)5LZ,VS4)J1F,CWL)C27,V1M)XYQ,QNZ)G3G,D4R)NF9,NNP)JG3,B37)P5P,DLX)4KM,CR8)H7N,HVQ)193,3ZM)1QP,7JX)LJN,TNW)CYP,8ZY)9WS,LTX)51X,PNQ)NWH,W16)QV7,TB1)Y39,KF7)MZH,R41)QX1,1J6)J4T,BCH)9RF,1B1)XHX,YXZ)7P5,3K7)NSV,LPL)ZDS,L9P)83J,FZR)YX3,W9N)11P,CWZ)S21,MRD)YG4,22L)NXN,1JH)S4G,PXJ)6CF,B5P)HLG,PSL)YVS,Q1T)DLX,7SQ)37T,YFK)LCC,XHC)51C,PZ5)HT8,YTP)J73,H6G)XVV,GG5)DS7,KVF)PSL,N75)SYT,2Z1)L36,T54)JGP,G3G)RBM,2HV)3SH,NHF)KNC,H9T)3CZ,1M9)G3B,LK3)PNQ,XMS)1NV,LMR)ZZP,KJD)S1Q,759)917,XDS)NBS,596)RVR,DJM)T9D,G5D)JCH,TZ6)2XK,KH3)9JX,NXT)5Q1,7VV)VW7,Q48)8GR,PRV)P59,3SV)NNN,6WK)P3L,T11)2X2,FST)TVR,72X)388,H6M)6HN,L3V)WXJ,NXV)C3M,7WY)VZN,CVS)7JX,2KK)DMQ,49H)XCL,XRQ)3BX,S1Q)97G,BJM)759,33J)F3Q,N97)WF5,PMW)V5C,3XD)JQG,BVM)L25,H5J)2SV,VV4)NV7,FCZ)KHK,1BY)32K,M4X)DQG,ZS1)NHS,QV7)42L,F3Q)GKF,7LN)S3D,ZWK)VG1,1Z9)7CR,335)N12,628)B34,9LW)5PJ,6HZ)ZR5,XSR)YXL,6GD)BQR,FQN)7YX,TY9)1H7,8MY)X3B,R6J)9BR,S5Z)N7S,XFR)W8J,6V7)CG5,4YF)HHQ,4GX)WG4,6WH)7KG,5MK)V1G,B1C)WWN,8M2)9V4,JJ2)9LW,5JR)GKD,54F)LYP,7KG)9FK,DQB)WMJ,Q7Q)9VM,TJW)C14,5YN)CCQ,HDY)WCP,G1S)YDK,BH1)VC4,DJS)CFP,THJ)2TQ,6PN)1M9,783)XLZ,CZQ)87X,759)W9N,HLW)ZZX,THD)DHX,VW7)G7J,7MN)K2B,HKW)PSK,YXC)H6G,NCM)5MK,T49)PZF,1D1)335,1V6)6HZ,46W)544,GGC)Q7Q,NKZ)HMF,G3B)CH4,X9B)J79,9RF)X1T,S4G)7WX,4Y7)4K6,WWN)4R7,8XC)7DW,9FP)2LK,7VV)W6Z,HRR)7SQ,6HP)CMN,32K)V8W,69S)XSR,HS6)6JW,22Q)2HV,PTC)3C6,JF5)5R4,JCH)L65,TNW)QJJ,91D)45B,RJ5)8LF,4D9)983,HRS)PSY,MT5)T1T,5PJ)S48,FSJ)7HW,SMQ)P2Y,KNC)46W,HMF)9FP,9V4)3DX,P5P)YWH,7BZ)1P4,X3B)JF5,FHJ)KBG,RZW)PLS,W16)25D,Z54)TNW,8YP)B29,DRP)NHQ,XDS)X65,J7Z)VHZ,M2R)1BY,4XG)F18,JYZ)P5X,5Q1)HKW,TZ3)G2Y,19S)GZ5,JW5)MT5,PWT)RCJ,ZXC)DQB,RSN)T35,VSB)HSD,NV7)CN4,X86)G1S,BKC)22Q,8F8)F6K,NTW)NNP,PB2)J8M,G4S)Y4F,THS)Q2T,XKV)N3T,7RN)MFN,RLT)L97,Y4P)P36,SGM)DWY,FX7)RJ5,9VM)49J,72D)8V2,HNC)GG3,RVR)6Y4,8V2)K6N,TV7)BSC,NBS)JJJ,COM)28P,QSY)MRM,LVN)X3M,WNH)DHT,R16)DJM,RBM)YXY,QJJ)VPY,ZB8)B8G,J79)HDY,NTS)G4S,9FK)NRC,TSW)HFM,DS7)BX1,JGP)CJ4,17X)XY6,7DW)4WR,7SQ)3FP,WZH)2Z1,TN8)CJ6,XRJ)22L,H5T)KTW,XMJ)ZC3,H4X)WL3,YG4)92F,B29)Y7B,KVG)DPN,Q8G)TQR,HLG)H5T,Y5B)T54,S3Y)7WY,W9G)PTR,YWH)QSY,5KW)5W7,WDS)PWT,1YS)DB5,6YB)HNM,GLS)RSN,H8D)XWM,FFV)3ZM,F8M)XMJ,13T)W9G,XS6)6YB,F18)5LH,WXK)VMQ,JZ7)TBG,Y92)SJ4,P2Y)GC2,MF9)TT6,NHS)XWK,KHK)6WK,TT6)T6M,8LH)9K8,Y39)91C,T63)BKC,465)7LV,HWP)4XG,X6D)HTH,N3T)ZKN,FSK)QF4,CW3)BDF,9QB)TV7,YNP)Q1T,SML)V3G,NLQ)46H,JS8)D1Z,L4L)QF6,S2T)LMR,3D2)VSB,GHB)F29,WRD)FB3,NLQ)N8N,HBL)S5T,6HN)8Y2,6SY)7RL,4YF)JL4,638)NKZ,VG1)4R4,M4N)77J,959)2LZ,J1F)D7L,MFP)6V7,LWB)WH8,6Y6)19S,5W7)HWL,9L1)HG4,5WY)YJ9,5NN)GNX,6NH)QCH,Y5M)QNZ,MJD)Q48,Z4Q)BTP,WZF)71T,GSF)NXT,N12)QL8,TTQ)Y7F,1NV)7RN,HSD)YY3,XY6)8XT,CT5)BMW,GB3)L5Z,KL2)TJW,H7N)HHC,LCG)Y4P,YWJ)ZWK,ZXC)KH7,QCH)SLZ,4R4)45G,544)YYZ,TR5)1Z9,1P4)X5Z,6FM)B2T,1T2)GF8,F29)YKX,P92)M4X,K6N)JS8,3G8)7R9,KFR)V2T,45G)9JP,QF4)SZ6,YXY)GLS,VR3)PCQ,WV9)6WX,8G7)N97,Q5B)DCX,XYQ)K8V,2X2)PL4,FVP)9BK,PZG)VCP,1Q2)9NK,ZDR)R8T,C5G)8M2,7LV)HBN,MH7)G98,KFR)P99,J53)HJS,K8S)DX5,HHR)T8B,VLW)PWV,JJJ)1B9,CH1)1Q2,BPZ)YNP,9QB)DJ2,RZW)RLT,SZY)H53,GRP)1TC,VPY)THL,7WX)X83,8Y2)N6F,5NM)1J1,YY3)1DY,88S)615,W1C)R9D,FKN)FY3,5CX)LKB,P99)WLZ,RBN)T5K,PB2)VR3,TZ6)MF9,BXH)X9B,5TN)FVQ,5LZ)KJD,XN5)1HS,H5Y)R4X,37T)WMZ,LRY)HQH,PWJ)XKV,2LK)SG5,JCB)BJW,1B9)CWL,FWB)7QN,58G)CS2,HT8)XT9,B65)MV5,7FD)TZ3,42L)H3G,B62)S3P,BZ3)BDM,VCP)C7W,94F)V54,JBK)KL2,YKX)Y92,YQX)HHR,1H7)SXM,1ZF)YQX,388)6KK,M78)DQV,1J5)JGL,41N)6GS,LCC)FC8,MRM)XFL,V7Z)94F,JQG)2BF,W5K)TN8,CS2)91D,635)QZZ,5LH)HDB,XHX)XQV,X36)Y5B,CG5)3LQ,V3G)WV9,SMN)FZR,2SV)NMJ,F92)1B1,NHQ)6SY,BDM)HQ2,1K7)F77,QZZ)SYG,YXD)JW1,11P)7MN,6KK)VV4,VNM)3SV,LX2)WL4,GG3)54Y,WVF)DDH,1TC)HQ9,886)SML,XMN)TFK,LKB)WLS,ZKN)SWR,VPL)SKH,FBB)KVG,P5X)S4Z,H51)5NM,BFQ)H9T,QKL)1T2,Y7F)B2B,W9D)1CL,HQH)TTQ,FQB)SNJ,77J)RYM,917)1N2,R8T)HD5,VS4)959,K6F)W3H,7CR)YPQ,N27)YXZ,617)7XW,SYG)M5J,9XD)THD,YQQ)W5K,PRM)635,KLX)DZQ,784)P92,1TN)QJ1,THL)KWP,SXM)BZ3,193)839,FC8)GSF,DJM)R6J,VJX)NJY,PSK)4NC,HHC)MQ5,5CB)XHC,PLZ)S5Z,6SK)88V,ZPR)LWB,83J)B65,J8M)QM5,GTY)SAN,FBN)F96,CPF)D3V,K82)LCG,YPQ)X6M,KLD)1B3,4HT)HRS,FZS)49S,S45)8XC,3CZ)YNV,L73)1D1,9KX)TDD,P7J)LSS,4QQ)RZ2,R9D)Z47,3PN)XRJ,V1G)Y9R,6Y4)P7J,JWV)2S2,7RL)465,CZV)4YF,21K)FQB,PCQ)W16,TQR)8HS,W6Z)195,KVG)S2C,Q81)Z4Q,23P)NF8,JRD)GTV,Z54)F8M,KFC)M4N,D3Q)TBB,1H1)1TN,6N6)L9P,87X)HSS,XWK)M5Q,R8N)K6F,ZZP)8GX,J7Z)KNV,PL4)3CF,ZY4)KVF,FB3)8RL,L2S)54F,LT2)LVD,FVQ)1J5,HSS)S2T,Y6N)T4C,72D)THJ,4K6)XZJ,DHX)FCZ,RV4)YFK,4NC)ZF2,6WX)KTC,WLZ)6Y6,SZ6)5CB,QF6)RBN,839)7CJ,K2Y)DVL,RZ2)BFZ,1HS)JZ7,HSV)WCM,MS8)V1M,JL4)S3Y,KWP)88S,T1T)4HT,XDB)TB1,SN1)4QQ,2TQ)YS6,R6J)K8S,BX1)TDL,G3F)784,SLZ)4W9,X65)6WJ,WC4)72X,YPQ)SGM,T54)TF4,DQV)THS,NNB)JWV,CN4)XSN,1TC)C2F,HJS)ZPR,PWV)LPL,XR3)Y3R,59R)926,KH7)FY7,TDD)Z6D,195)628,KHK)WCY,9QZ)B37,Q2T)BP1,BSC)1JH,W46)RZN,FZH)GG5,4SR)6NR,983)9QZ,7YX)68C,NPF)CHP,JX7)Z2Y,G7J)49H,4KM)YXD,DJ9)6PN,MV5)FST,8GR)4D9,ZB3)K7Y,T4C)MF5,NMJ)WZH,KH7)J53,H53)JW3,CYP)WRD,YYZ)9XD,RMG)W1C,PXM)JG4,6Q7)FSK,L2S)DJS,DPN)V5K,8VX)2PZ,4SG)BFQ,HQ2)ZQ3,382)VJX,VC4)FR7,FR7)YDQ,3LQ)T49,YY3)7ZK,6NR)Q5B,VY1)KZN,YX3)1YS,LJQ)D8M,615)69S,SG5)3K7,1B3)BQ7,XRJ)6GD,DDH)XRQ,D5S)QM1,QX1)CT5,LYP)6HP,WLS)WSR,SJS)46J,F6K)8G7,YXL)JJ2,GMP)CVS,4R7)RZV,544)617,QL8)LFC,WSR)NHB,V8W)ZNG,97P)LK3,T1T)FM6,XLZ)BNV,FST)21K,QM5)ZGN,MQ5)W2T,XK1)W9D,QS7)FHJ,G4Y)MLQ,6CF)VQX,8VX)KH3,BMW)VYR,VW7)TQX,N8N)6Q7,Z6D)V6L,9K8)81T,VMQ)TY9,PTW)HN4,PNV)K2Y,TF4)1D4,2S2)59W,YS6)58G,NWH)W4J,HBN)3XD,Q15)NHF,B2B)3VG,VX8)HWP,VBP)FBB,PLS)H5J,1N2)CXM,DX5)V7Z,TY9)J7Z,LZ4)PLZ,JM9)HNC,HG4)4Y7,CFP)5JR,BDF)XPT,FQN)K62,M5L)K82,TBG)2LX,2S2)X36,4QQ)Z54,926)CR8,W4J)6N6,71T)G9J,SNJ)DJ9,S2C)LTX,JG3)8CG,1QP)PMW,FM6)SMN,F96)LVN,ZD3)FR9,91C)P69,HHQ)YMG,WXR)L3V,XVV)PZG,25D)JW4,S4Z)WC4,NF9)BDW,FJX)861,VQX)H8D,K8V)33J,Z4Y)L4L,M5J)M9K,D71)947,C5L)MC9,MF5)YOU,SX5)WSD,WCM)M5L,LDD)HVQ,YLC)VF8,HN4)MM5,T35)GB3,MS8)7VV,ZPC)9L1,RJ5)H51,X83)6MX,SYG)CH1,HBP)HP1,LFC)KGW,XCL)9KX,VYM)2CK,6GS)VLW,QJ1)3D2,LJN)1J6,DJ2)26J,1J1)KLX,12H)RMG,3ZK)5YN,59W)9Y8,51X)XR3,3SH)5KW,WMZ)DH3,MPS)NZ5,P96)ZB8,BLD)HBL,B34)NTS,DH3)PTC,SWR)VY1,N8N)JW5,G8N)23P,L5Z)FZH,2BF)F92,SJ4)MJ3,JJT)7JK,ZC3)3G8,7P5)8C4,V1N)YXC,1CL)HRR,V5K)FWB,P36)HS6,W52)SJS,88V)W52,X5Z)5M6,BQ7)2JR,MZH)ZD3,Q6R)L7K,MJ5)SGR,NLR)YTP,ZNG)BLD,2PZ)R41,C9X)LZ4,1DY)B62,J4T)SVG,GQP)CZQ,5M6)BCH,1D1)1H1,Z47)684,WXJ)DK7,P4B)SQQ,68C)W8S,4WR)XN5,VF8)9HD,GD7)MH7,W2T)L73,S48)JRD,S3D)T63,V5C)SL5,C7W)BRH,K9Z)C97,6NH)12N,BRH)L2S,GD5)RG7,G5V)PRM,LVD)G5D,RG7)5CX,JW3)9MD,CJ4)FX7,PZF)M8S,7JK)MJ5,KTW)LRY,XWK)MFP,C2F)4GX,D1Z)R16,1RQ)NPF,W5F)596,9Y8)H5Y,6NW)11S,1P1)G5V,D4R)PB2,BNV)GD5,8XT)6H7,FKQ)NCM,QS7)M2R,NSV)4GQ,TQX)JT3,HP1)VS4,HQ9)XMN,F77)ZS1,M3X)PXJ,ZGN)7C4,TVR)JJT,YMG)C5G,NX5)CW3,RCJ)2KK,8VZ)1V6,DX5)GRP,9HD)1RQ,HXW)41N,Y9R)PZ5,2XK)MQJ,QF4)JH2,WG4)VNM,VHZ)RZQ,SGR)FKQ,SQQ)Y6N,DHT)GHB,4PV)QKL,GTV)NNB,CH4)1NT,3BX)JBK,RYM)FBN,VZN)S8D,SV1)KZP,THF)45S,4ZM)CWZ,T5K)5MR,26J)2CD,CXM)886,DQV)RQR,G2Y)NLQ,KNV)C9X,97G)THF,45B)NXV,9NK)DRP,XMS)TZJ,7C4)NLR,7HW)W5F,KZP)4PV,HT8)638,3CF)LT2,ZY4)Q8G,3DX)K24,BQR)TJV,46H)FVP,P69)MPS,6MX)FF4,DY5)XDB,7RL)LKK,L97)BVM,2JR)Y5M,TFK)FFV,W8J)G3F,P59)26Y,596)N27,8CG)8DL,XT9)4SR,M5Q)6WH,KBG)GMP,CCQ)8YP,9BK)CPF,HNM)353,3C6)ZXC,S8D)GTY,49S)5VJ,8GX)GGC,S3P)PXM,NXT)PNV,YBJ)YWJ,4PW)6NW,D7L)MRD,T9D)D3Q,2LX)7FD,X3M)V1N,K62)1P1,8HS)47M,TDD)JM9,HDB)BXH,MLQ)5TN,3VG)SZY,FY7)SMQ,YDQ)D5S,C3M)3ZT,N7S)HSZ,HTH)P96,WL4)5WY,28P)9QB,NJY)C5L,V54)VYM,3XD)XFR,NF8)LJQ,4W9)K9Z,RZQ)XDS,TJV)TZ6,ZGQ)72D,JT3)XS6,P92)WVF,SJ4)SN1,6H7)P4B,3K5)PRV,2CK)XMS,861)CZV,H3G)1ZF,R16)GQP,51C)4G6,V2T)1PS,L7K)WNH,HFM)VKR,Y4F)Q81,P4V)FKN,MM5)8MY,92F)H4X,7WM)3LZ,684)KFC,D3V)RV4,2T9)1K7,YJ9)TQL,B8G)HBP,DVL)ZV1,47M)XNZ,FF4)LDD,JW1)5BR,GKD)RZW,45S)Q15,L65)JX7,4F5)ZY4,SLZ)X86,1H1)JYZ,GF8)B5P,QVX)2T9,BP1)7LN,Y3R)P4V,WCP)8VZ,GB3)S45,ZC2)59R,1T2)HXW,FSJ)NTW,CH4)M3X,TBB)SX5,JW4)MS8,GRP)LX2,3FP)12H,FY3)48Y,12N)DY5,9BR)MJD,KNC)WXR,6MX)4PW";
    //const input = "COM)B,B)C,C)D,D)E,E)F,B)G,G)H,D)I,E)J,J)K,K)L,K)YOU,I)SAN";
    return input.split(",");
}

const planets = new Array(new Planet("COM", null));
const input = parseInput();

let you;
let san;

input.forEach(entry => {
    let [previous, current] = entry.split(")");
    let previousPlanet;
    planets.forEach(planet => {
        if(planet.name === previous) {
            previousPlanet = planet;
        }
    });

    if(!previousPlanet) {
        previousPlanet = new Planet(previous, null);
        planets.push(previousPlanet);
    }

    let currentPlanet;
    planets.forEach(planet => {
        if(planet.name === current) {
            planet.prev = previousPlanet;
            currentPlanet = planet;
        }
    });

    if(!currentPlanet) {
        currentPlanet = new Planet(current, previousPlanet)
        planets.push(currentPlanet);
    }

    if(current === "YOU") { you = currentPlanet; }
    if(current === "SAN") { san = currentPlanet; }
});

let counter = 0;
planets.reverse().forEach(planet => {
    currentPlanet = planet;
    while(currentPlanet.prev) {
        counter += 1;
        currentPlanet = currentPlanet.prev;
    }
});

console.log(counter);

let youPath = [];
let youTemp = you;
while(youTemp.prev) {
    youPath.push(youTemp.prev.name);
    youTemp = youTemp.prev;
}

let sanPath = [];
let sanTemp = san;
while(sanTemp.prev) {
    sanPath.push(sanTemp.prev.name);
    sanTemp = sanTemp.prev;
}

let common = [];
youPath.forEach(planet => {
    if(sanPath.includes(planet)) {
        common.push(planet);
    }
});

console.log(youPath);
console.log(sanPath);
console.log(common);

let intersection = common[0];
let youCounter = 0;
while(you.name !== intersection) {
    youCounter += 1;
    you = you.prev;
}

let sanCounter = 0;
while(san.name !== intersection) {
    sanCounter += 1;
    san = san.prev;
}

console.log(youCounter);
console.log(sanCounter);
console.log(`result: ${youCounter + sanCounter - 2}`);