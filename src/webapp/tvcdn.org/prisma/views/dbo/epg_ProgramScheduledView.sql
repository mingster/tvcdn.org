SELECT
  ch.guid AS channel_id,
  ch.title AS channelTitle,
  ps.id,
  ps.guid,
  ps.progBase_id,
  ps.startTime,
  ps.stopTime,
  ps.title,
  ps.subTitle,
  ps.descr,
  ps.tags,
  ps.actors,
  ps.previouslyShown,
  ps.status,
  ps.revision,
  ps.sourceUrl1,
  ps.visit,
  ps.rating,
  ps.creator,
  ps.creationDate,
  ps.modifier,
  ps.lastModified
FROM
  epgdb.dbo.epg_ProgramScheduled AS ps
  JOIN epgdb.dbo.epg_ProgramBase AS pb ON ps.progBase_id = pb.id
  JOIN epgdb.dbo.epg_Channel AS ch ON pb.ch_id = ch.guid;