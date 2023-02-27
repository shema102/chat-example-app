// @ts-ignore
import {PUBNNUB_PUBLISH_KEY, PUBNUB_SUBSCRIBE_KEY} from '@env';

if (!PUBNNUB_PUBLISH_KEY) {
  console.error('PUBNNUB_PUBLISH_KEY is not defined');
}

if (!PUBNUB_SUBSCRIBE_KEY) {
  console.error('PUBNUB_SUBSCRIBE_KEY is not defined');
}

export const pubnubPublishKey: string = PUBNNUB_PUBLISH_KEY;
export const pubnubSubscribeKey: string = PUBNUB_SUBSCRIBE_KEY;
