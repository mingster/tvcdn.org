SELECT
  TOP (100) PERCENT c.Email,
  c.[exp],
  o.OrderStatusID,
  o.PaidDate,
  o.OrderTotal,
  o.PaymentMethodName,
  o.BillingAddress1,
  o.BillingAddress2,
  o.BillingCity,
  o.BillingCountry,
  c.geocountry,
  o.CreatedOn AS OrderDate,
  o.orderid
FROM
  nop_order AS o
  JOIN pstv_CustomerStatView AS c ON o.CustomerID = c.CustomerID
ORDER BY
  o.createdon DESC;