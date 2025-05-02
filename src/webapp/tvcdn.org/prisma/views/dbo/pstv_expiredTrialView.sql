SELECT
  *
FROM
  pstv_CustomerStatView
WHERE
  [exp] < GETUTCDATE()
  AND active = 1
  AND CustomerID NOT IN (
    SELECT
      CustomerID
    FROM
      Nop_Order
    WHERE
      OrderTotal > 0
      AND OrderStatusID = 30
  )
  AND CustomerID NOT IN (
    SELECT
      subAccountId
    FROM
      pstv_subAccount
  );