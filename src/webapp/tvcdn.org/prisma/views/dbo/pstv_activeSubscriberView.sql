SELECT
  TOP (100) PERCENT (
    SELECT
      TOP (1) OrderID
    FROM
      dbo.Nop_Order
    WHERE
      (CustomerID = c.CustomerID)
      AND (
        OrderID IN (
          SELECT
            OrderID
          FROM
            dbo.Nop_OrderNote
          WHERE
            (Note = 'Order has been marked as paid')
        )
      )
      AND (OrderTotal > 0)
      AND (OrderStatusID = 30)
      AND (PaidDate IS NOT NULL)
      AND (PaymentStatusID = 30)
    ORDER BY
      CreatedOn DESC
  ) AS orderId,
  (
    SELECT
      TOP (1) OrderTotal
    FROM
      dbo.Nop_Order AS Nop_Order_2
    WHERE
      (CustomerID = c.CustomerID)
      AND (
        OrderID IN (
          SELECT
            OrderID
          FROM
            dbo.Nop_OrderNote AS Nop_OrderNote_2
          WHERE
            (Note = 'Order has been marked as paid')
        )
      )
      AND (OrderTotal > 0)
      AND (OrderStatusID = 30)
      AND (PaidDate IS NOT NULL)
      AND (PaymentStatusID = 30)
    ORDER BY
      CreatedOn DESC
  ) AS orderTotal,
  (
    SELECT
      TOP (1) CreatedOn
    FROM
      dbo.Nop_Order AS Nop_Order_1
    WHERE
      (CustomerID = c.CustomerID)
      AND (
        OrderID IN (
          SELECT
            OrderID
          FROM
            dbo.Nop_OrderNote AS Nop_OrderNote_1
          WHERE
            (Note = 'Order has been marked as paid')
        )
      )
      AND (OrderTotal > 0)
      AND (OrderStatusID = 30)
      AND (PaidDate IS NOT NULL)
      AND (PaymentStatusID = 30)
    ORDER BY
      CreatedOn DESC
  ) AS orderDate,
  s.SubscriptionInvoiceNumber,
  s.SubscribedPackageId,
  s.BillingProvider,
  c.CustomerID,
  c.CustomerGUID,
  c.Email,
  c.Username,
  c.PasswordHash,
  c.SaltKey,
  c.AffiliateID,
  c.BillingAddressID,
  c.ShippingAddressID,
  c.LastPaymentMethodID,
  c.LastAppliedCouponCode,
  c.GiftCardCouponCodes,
  c.CheckoutAttributes,
  c.LanguageID,
  c.CurrencyID,
  c.TaxDisplayTypeID,
  c.IsTaxExempt,
  c.IsAdmin,
  c.IsGuest,
  c.IsForumModerator,
  c.TotalForumPosts,
  c.Signature,
  c.AdminComment,
  c.Active,
  c.Deleted,
  c.RegistrationDate,
  c.TimeZoneID,
  c.AvatarID,
  c.DateOfBirth,
  s.id,
  s.customer_id,
  s.expiration,
  s.status,
  s.creator,
  s.creationDate,
  s.modifier,
  s.lastModified,
  s.note,
  cp.ipAddr,
  cp.geoCity,
  cp.geoRegion,
  cp.geoCountry
FROM
  dbo.Nop_Customer AS c
  JOIN dbo.pstv_subscriber AS s ON c.CustomerID = s.customer_id
  JOIN dbo.pstv_CustomerProfile AS cp ON c.CustomerID = cp.customerId
WHERE
  (s.status = 1);