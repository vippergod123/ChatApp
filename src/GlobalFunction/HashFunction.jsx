export const HashUID = (UID1,UID2) => { 
    
    UID1 = UID1? UID1: "";
    UID2 = UID2? UID2: "";

    var hashA = 0
    var hashB = 0
    
    for (var i = 0; i < UID1.length; i++){
        var tempA = UID1.charCodeAt(i)
        hashA +=  tempA
    }

    for (var j = 0; j < UID2.length; j++){
        var tempB = UID2.charCodeAt(j)
        hashB +=  tempB
    }
    return hashA+hashB
}
