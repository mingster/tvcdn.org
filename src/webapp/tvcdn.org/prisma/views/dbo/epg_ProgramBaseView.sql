SELECT
  pb.id,
  pb.ch_id,
  ch.title AS channel_title,
  pb.title,
  pb.subTitle,
  pb.showTime,
  pb.timezone,
  pb.descr,
  pb.duration,
  pb.tags,
  pb.actors,
  pb.lang,
  pb.country,
  pb.photo1,
  pb.photo2,
  pb.photo3,
  pb.url1,
  pb.url2,
  pb.status,
  pb.revision,
  pb.creator,
  pb.creationDate,
  pb.modifier,
  pb.lastModified
FROM
  epgdb.dbo.epg_Channel AS ch
  JOIN epgdb.dbo.epg_ProgramBase AS pb ON ch.guid = pb.ch_id;