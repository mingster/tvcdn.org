SELECT
  DISTINCT TOP (100) PERCENT ma.mainAccountId,
  s.expiration
FROM
  dbo.pstv_subscriber AS s
  JOIN dbo.pstv_subAccount AS ma ON s.customer_id = ma.mainAccountId
ORDER BY
  ma.mainAccountId;