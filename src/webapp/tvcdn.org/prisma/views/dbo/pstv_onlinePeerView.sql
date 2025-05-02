SELECT
  p.seqid,
  p.userName,
  c.CustomerID,
  p.reportTime,
  p.ch_id,
  (
    SELECT
      COUNT(*) AS Expr1
    FROM
      dbo.pstv_subAccount
    WHERE
      (subAccountId = c.CustomerID)
  ) AS isSubAccount,
  (
    SELECT
      title
    FROM
      epgdb.dbo.epg_Channel AS ch
    WHERE
      (p.ch_id = guid)
  ) AS title,
  (
    SELECT
      expiration
    FROM
      dbo.pstv_subscriber
    WHERE
      (customer_id = c.CustomerID)
  ) AS expiration,
  (
    SELECT
      STATUS
    FROM
      dbo.pstv_subscriber AS pstv_subscriber_1
    WHERE
      (customer_id = c.CustomerID)
  ) AS STATUS,
  (
    SELECT
      TOP (1) OrderTotal
    FROM
      dbo.Nop_Order AS o
    WHERE
      (CustomerID = c.CustomerID)
      AND (OrderTotal > 0)
      AND (OrderStatusID = 30)
    ORDER BY
      CreatedOn DESC
  ) AS OrderTotal,
  c.AffiliateID,
  c.TimeZoneID,
  c.LanguageID,
  p.enKey,
  p.ip,
  p.userAgent,
  p.playerVer,
  p.referrer,
  p.creationDate,
  p.message,
  p.clientId,
  c.RegistrationDate,
  cp.geoCity,
  cp.geoRegion,
  cp.geoCountry
FROM
  dbo.pstv_CustomerProfile AS cp
  JOIN dbo.Nop_Customer AS c ON cp.customerId = c.CustomerID
  RIGHT JOIN [5iktv_viewLog].dbo.trak_onlinePeers AS p ON c.Username = p.userName;