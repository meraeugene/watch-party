import React from "react";

const Barcode = () => {
  const code =
    "11010010000100111011001011101111011010001110101110011001101110010010111101110111001011001001000011011000111010110001001110111101101001011010111000101101";

  return (
    <table className="barcode">
      <tbody>
        <tr>
          {code.split("").map((bit, index) => (
            <td
              key={index}
              style={{
                backgroundColor: bit === "1" ? "black" : "white",
                width: 2,
                height: 50,
              }}
            />
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default Barcode;
