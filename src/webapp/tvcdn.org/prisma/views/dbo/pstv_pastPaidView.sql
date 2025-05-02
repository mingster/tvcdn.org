SELECT
  TOP (100) PERCENT ipAddr,
  geocountry,
  exp,
  lastWatchSession,
  Active,
  RegistrationDate,
  OrderID,
  OrderDate,
  OrderTotal,
  LastAppliedCouponCode,
  Email,
  Username,
  CustomerID,
  AffiliateID,
  LastPaymentMethodID,
  TimeZoneID,
  DateOfBirth,
  STATUS
FROM
  dbo.pstv_CustomerStatView
WHERE
  (exp < GETDATE())
  AND (
    CustomerID IN (
      SELECT
        CustomerID
      FROM
        dbo.Nop_Order
      WHERE
        (OrderTotal > 0)
        AND (OrderStatusID = 30)
        AND (PaidDate IS NOT NULL)
    )
  )
ORDER BY
  exp DESC;