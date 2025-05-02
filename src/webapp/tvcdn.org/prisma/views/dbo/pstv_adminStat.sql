SELECT
  (
    SELECT
      COUNT(*)
    FROM
      dbo.pstv_activeSubscriberView
  ) AS activePaidSubscriber,
  (
    SELECT
      count(*)
    FROM
      pstv_CustomerStatView
    WHERE
      [exp] < GETUTCDATE()
      AND CustomerID IN (
        SELECT
          CustomerID
        FROM
          Nop_Order
        WHERE
          OrderTotal > 0
          AND OrderStatusID = 30
          AND paiddate IS NOT NULL
      )
  ) AS pastPaidUser,
  (
    SELECT
      count(*)
    FROM
      pstv_subAccount
  ) AS subAcct,
  (
    SELECT
      count(*)
    FROM
      pstv_CustomerStatView
    WHERE
      [exp] >= GETUTCDATE()
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
      )
  ) AS activeTrialUser,
  (
    SELECT
      count(*)
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
      )
  ) AS expiredUser,
  (
    SELECT
      COUNT(*)
    FROM
      dbo.Nop_Customer
    WHERE
      (Active = 0)
  ) AS inactive,
  (
    SELECT
      COUNT(*)
    FROM
      dbo.site_contactus
    WHERE
      (STATUS = 0)
  ) AS numOfInquire,
  (
    SELECT
      COUNT(*)
    FROM
      dbo.pstv_subscriber
  ) AS totalNumOfSubscriber,
  (
    SELECT
      COUNT(*)
    FROM
      dbo.Nop_Customer AS Nop_Customer_1
  ) AS totalNumOfAcct,
  (
    SELECT
      COUNT(*)
    FROM
      epgdb.dbo.epg_Channel
    WHERE
      (STATUS = 1)
  ) AS numOfCh,
  (
    SELECT
      COUNT(*)
    FROM
      dbo.Nop_Affiliate
  ) AS numOfAffiliate,
  (
    SELECT
      COUNT(*)
    FROM
      [5iktv_viewLog].dbo.trak_onlinePeers
  ) AS numOfConcurrent,
  (
    SELECT
      COUNT(*)
    FROM
      dbo.pstv_device
    WHERE
      model LIKE 'roku%'
  ) AS numOfRoku,
  (
    SELECT
      count(*)
    FROM
      pstv_activeSubscriberView
    WHERE
      customerid IN (
        SELECT
          customerid
        FROM
          pstv_device
        WHERE
          model LIKE 'roku%'
      )
  ) AS RokuPaid,
  (
    SELECT
      count(*)
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
      )
      AND customerid IN (
        SELECT
          customerid
        FROM
          pstv_device
        WHERE
          model LIKE 'roku%'
      )
  ) AS RokuExpired,
  (
    SELECT
      count(*)
    FROM
      pstv_CustomerStatView
    WHERE
      [exp] >= GETUTCDATE()
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
      )
      AND customerid IN (
        SELECT
          customerid
        FROM
          pstv_device
        WHERE
          model LIKE 'roku%'
      )
  ) AS RokuTrial,
  (
    SELECT
      count(*)
    FROM
      pstv_subAccount
    WHERE
      subAccountId IN (
        SELECT
          customerid
        FROM
          pstv_device
        WHERE
          model LIKE 'roku%'
      )
  ) AS RokuSubAcct,
  (
    SELECT
      COUNT(*)
    FROM
      dbo.pstv_device
    WHERE
      model LIKE 'And%'
  ) AS numOfDroid,
  (
    SELECT
      count(*)
    FROM
      pstv_activeSubscriberView
    WHERE
      customerid IN (
        SELECT
          customerid
        FROM
          pstv_device
        WHERE
          model LIKE 'And%'
      )
  ) AS DroidPaid,
  (
    SELECT
      count(*)
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
      )
      AND customerid IN (
        SELECT
          customerid
        FROM
          pstv_device
        WHERE
          model LIKE 'And%'
      )
  ) AS DroidExpired,
  (
    SELECT
      count(*)
    FROM
      pstv_CustomerStatView
    WHERE
      [exp] >= GETUTCDATE()
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
      )
      AND customerid IN (
        SELECT
          customerid
        FROM
          pstv_device
        WHERE
          model LIKE 'And%'
      )
  ) AS DroidTrial,
  (
    SELECT
      count(*)
    FROM
      pstv_subAccount
    WHERE
      subAccountId IN (
        SELECT
          customerid
        FROM
          pstv_device
        WHERE
          model LIKE 'And%'
      )
  ) AS DroidSubAcct;