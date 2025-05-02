SELECT
  cp.ipAddr,
  cp.geoCity,
  cp.geoRegion,
  cp.geoCountry,
  s.expiration AS exp,
  cp.lastWatchSession,
  c.Active,
  s.status,
  c.RegistrationDate,
  (
    SELECT
      TOP (1) OrderID
    FROM
      dbo.Nop_Order
    WHERE
      (CustomerID = c.CustomerID)
    ORDER BY
      CreatedOn DESC
  ) AS OrderID,
  (
    SELECT
      TOP (1) CreatedOn
    FROM
      dbo.Nop_Order AS Nop_Order_2
    WHERE
      (CustomerID = c.CustomerID)
    ORDER BY
      CreatedOn DESC
  ) AS OrderDate,
  (
    SELECT
      TOP (1) OrderTotal
    FROM
      dbo.Nop_Order AS Nop_Order_1
    WHERE
      (CustomerID = c.CustomerID)
    ORDER BY
      CreatedOn DESC
  ) AS OrderTotal,
  c.LastAppliedCouponCode,
  c.Email,
  c.Username,
  c.CustomerID,
  c.AffiliateID,
  c.LastPaymentMethodID,
  s.BillingProvider,
  s.SubscribedPackageId,
  s.StripeCustomerId,
  s.SubscriptionInvoiceNumber,
  c.TimeZoneID,
  c.DateOfBirth
FROM
  dbo.Nop_Customer AS c
  LEFT JOIN dbo.pstv_CustomerProfile AS cp ON c.CustomerID = cp.customerId
  LEFT JOIN dbo.pstv_subscriber AS s ON c.CustomerID = s.customer_id;