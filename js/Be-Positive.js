BloodType = {
  
  AB_POS : "AB_POS",
  AB_NEG : "AB_NEG",
  A_POS  : "A_POS",
  A_NEG  : "A_NEG",
  B_POS  : "B_POS",
  B_NEG  : "B_NEG",
  O_POS  : "O_POS",
  O_NEG  : "O_NEG"

};

BloodTransfusionRules = {
  
  /**
   * Set the simulation speed.
   * @type {Number} : Valid values between 1 and 200
   */
  simulation_speed : 200,

  /**
   * returns BloodType, or false to give no BloodType
   * 
   * @name receive_patient
   * @param {Bank} blood_inventory
   * @param {Patient} patient
   * @returns {BloodType or false}
   *
   * Patient properties {
   *   gender : String, (MALE,FEMALE)
   *   blood_type : String (BloodType)
   * }
   * 
   * Bank properties {
   *   AB_POS : Integer,
   *   AB_NEG : Integer,
   *   A_POS  : Integer,
   *   A_NEG  : Integer,
   *   B_POS  : Integer,
   *   B_NEG  : Integer,
   *   O_POS  : Integer,
   *   O_NEG  : Integer
   * }
   * 
   */
   bank_inventory : function (blood_inventory, compatible_type){
      //reduce to the highest amount within the compatible_type array
      return compatible_type.reduce(function (prev, curr){
        if (blood_inventory[ curr ] > blood_inventory[ prev ]){
          return curr;
        }else{
          return prev;
        }
      });
   },


  receive_patient : function (blood_inventory, patient) {

    var compatible_type = [];

    switch (patient.blood_type){
      
      case BloodType.AB_POS:
       compatible_type = [BloodType.AB_POS, BloodType.B_POS, BloodType.A_POS, BloodType.B_NEG, BloodType.AB_NEG, BloodType.A_NEG];
       break;

      case BloodType.AB_NEG:
        compatible_type = [BloodType.B_NEG, BloodType.AB_NEG, BloodType.A_NEG];
        break;

      case BloodType.B_POS:
        compatible_type = [BloodType.O_POS, BloodType.B_POS, BloodType.B_NEG];
        break;

      case BloodType.B_NEG:
        compatible_type = [BloodType.B_NEG, BloodType.O_NEG];
        break;

      case BloodType.A_POS:
        compatible_type = [BloodType.A_NEG, BloodType.A_POS];
        break;

      case BloodType.A_NEG:
        compatible_type = [ BloodType.A_NEG, BloodType.O_NEG];
        break;

      case BloodType.O_POS:
        compatible_type = [BloodType.O_POS, BloodType.O_NEG];
        break;

      case BloodType.O_NEG:
        return BloodType.O_NEG;
 
    }

    // //if donor blood type === patient blood type 
    // return patient.blood_type;
    return this.bank_inventory( blood_inventory, compatible_type );

    // give a random blood type to anyone
    // very bad idea!
  //   return [
  //     BloodType.AB_POS,
  //     BloodType.AB_NEG,
  //     BloodType.A_POS,
  //     BloodType.A_NEG
  //   ][Math.floor(Math.random()*4)];

  }

};