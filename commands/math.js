const Discord = require("discord.js");

module.exports = {
  name: "math",
  description: "No keyword, and a mathematical expression followed by the prefix.",
  usage: "<math expression>",
  execute(message, args, prefix) {
    let calculate =
      "=" + message.content.toLowerCase().substring(prefix.length);
    if (
      isFinite(
        calculate.replace(
          /\=|\+|\-|\*|\/|\÷|\%|\(|\)|\,|\ |math.|pow|sqrt|round|floor|ceiling|ceil|pi|π|euler|absolute|abs|exp|logarithm|log|random|rand|rng/g,
          ""
        )
      )
    ) {
      calculate = calculate
        .replace(/ /g, "")
        .replace(/÷/g, "/")
        .replace(/power|pow/g, "Math.pow")
        .replace(/sqrt|squareroot/g, "Math.sqrt")
        .replace(/round/g, "Math.round")
        .replace(/floor/g, "Math.floor")
        .replace(/ceiling|ceil/g, "Math.ceil")
        .replace(/pi|π/g, "Math.PI")
        .replace(/euler/g, "Math.E")
        .replace(/absolute|abs/g, "Math.abs")
        .replace(/exp/g, "Math.exp")
        .replace(/logarithm|log/g, "Math.log")
        .replace(
          /random|rand|rng/g,
          "Math.random()"
        ); /*.replace(/acos|arccosine/g, "Math.acos").replace(/asin|arcsine/g, "Math.asin").replace(/atan|arctangent|atan1|arctangent1/g, "Math.atan").replace(/atan2|arctangent2/g, "Math.atan2").replace(/cos|cosine/g, "Math.cos").replace(/sin|sine/g, "Math.sin").replace(/tan|tangent/g, "Math.tan")*/
      if (calculate.replace(/[^%]/g, "").length > 0) {
        for (let i = 0; i < calculate.replace(/[^%]/g, "").length; i++) {
          while (
            (calculate[getSubstringIndex(calculate, "%", i + 1) + 1] == "+" ||
              calculate[getSubstringIndex(calculate, "%", i + 1) + 1] == "-" ||
              calculate[getSubstringIndex(calculate, "%", i + 1) + 1] == "*" ||
              calculate[getSubstringIndex(calculate, "%", i + 1) + 1] == "/" ||
              calculate[getSubstringIndex(calculate, "%", i + 1) + 1] == "(" ||
              calculate[getSubstringIndex(calculate, "%", i + 1) + 1] == ")" ||
              calculate[getSubstringIndex(calculate, "%", i + 1) + 1] == "," ||
              getSubstringIndex(calculate, "%", i + 1) + 1 ==
                calculate.length) &&
            calculate.replace(/[^%]/g, "").length > 0
          ) {
            for (
              let j = getSubstringIndex(calculate, "%", i + 1);
              j > -1;
              j--
            ) {
              if (
                calculate[j] == "=" ||
                calculate[j] == "+" ||
                calculate[j] == "-" ||
                calculate[j] == "*" ||
                calculate[j] == "/" ||
                calculate[j] == "(" ||
                calculate[j] == ")" ||
                calculate[j] == ","
              ) {
                calculate =
                  calculate.substring(0, j + 1) +
                  calculate.substring(
                    j + 1,
                    getSubstringIndex(calculate, "%", i + 1)
                  ) /
                    100 +
                  calculate.substring(
                    getSubstringIndex(calculate, "%", i + 1) + 1,
                    calculate.length
                  );
                break;
              }
            }
          }
        }
      }
      calculate = calculate.replace(/=/g, "");
      if (isFinite(eval(calculate))) message.channel.send(eval(calculate));
    }
  }
};
