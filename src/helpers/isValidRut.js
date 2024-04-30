const isRutValid = (rut) => {
    const rutWithoutDv = rut?.slice(0, -1).replace(/\./g, "");
    const dv = rut.charAt(rut.length - 1);
    const resultDv = calculateDvRut(parseInt(rutWithoutDv));

    console.log(dv, resultDv);

    const isValid =
    rutWithoutDv !== "" &&
    rutWithoutDv !== "0-" &&
    dv.toUpperCase() === resultDv;

    return isValid;
}

const calculateDvRut = (rut) => {
    const rutArr = Math.abs(rut).toString().split("");
    const digits = rutArr.map((digit) => parseInt(digit, 10)).reverse();
  
    const sum = digits.reduce((acc, digit, idx) => {
      const weightedDigit = digit * ((idx % 6) + 2);
  
      return acc + weightedDigit;
    }, 0);
  
    const modulo = 11 - (sum % 11);
    // console.log(modulo)
    if (modulo === 11) {
      return "0";
    } else if (modulo === 10) {
      return "K";
    } else {
      return modulo.toString();
    }
};

module.exports = isRutValid;