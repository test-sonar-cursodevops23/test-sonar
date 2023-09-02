function (req, res) {
    let operation = req.query.operation
    eval(`product_${operation}()`) // Noncompliant
    res.send("OK")
  };