import { format_count, seconds_to_time } from '../Utils/NumberUtil';
import ytdl from 'ytdl-core';

export function songResolver(info: ytdl.videoInfo, requestedBy?: string, requestedByAvatar?: string) {
	return {
		title: info.videoDetails.title,
		url: info.videoDetails.video_url,
		thumbnail: info.videoDetails.thumbnails[0].url.split('?')[0],
		duration: seconds_to_time(Number(info.videoDetails.lengthSeconds)),
		author: info.videoDetails.author.name,
		authorUrl: info.videoDetails.author.channel_url,
		views: format_count(Number(info.videoDetails.viewCount)),
		requestedBy: requestedBy ?? '',
		requestedByAvatar: requestedByAvatar ?? ''
	};
}
