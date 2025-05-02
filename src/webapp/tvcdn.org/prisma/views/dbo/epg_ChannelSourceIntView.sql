SELECT
  TOP (100) PERCENT csi.id,
  csi.ch_id,
  ch.title,
  ch.chNum,
  ch.mgmtId,
  ch.sortOrder,
  ch.status AS ch_status,
  csi.server_id,
  svr.hostname,
  svr.publicIp,
  csi.streamId,
  csi.device,
  csi.width,
  csi.height,
  csi.bitRate_v,
  csi.bitRate_a,
  csi.encoderType,
  csi.irdName,
  csi.irdChNum,
  csi.status,
  csi.creator,
  csi.creationDate,
  csi.modifier,
  csi.lastModified
FROM
  epgdb.dbo.epg_ChannelSourceInt AS csi
  JOIN epgdb.dbo.epg_Channel AS ch ON ch.guid = csi.ch_id
  JOIN epgdb.dbo.op_server AS svr ON svr.guid = csi.server_id
ORDER BY
  ch.sortOrder,
  csi.streamId,
  csi.bitRate_v,
  csi.ch_id,
  csi.server_id;