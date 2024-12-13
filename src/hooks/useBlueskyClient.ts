import { AtpAgent } from "@atproto/api";
import { defaultBlueskyConfig, useBlueskyConfig } from "./useBlueskyConfig";

export type BlueskyClient = AtpAgent;

const agents = new Map<string, BlueskyClient>();

export const getBlueskyClient = (service: string = defaultBlueskyConfig.service) => {
	let agent = agents.get(service);
	if (agent) {
		return agent;
	}
	agent = new AtpAgent({ service });
	agents.set(service, agent);
	return agent;
};

export const useBlueskyClient = (): BlueskyClient => {
	const { service } = useBlueskyConfig();
	return getBlueskyClient(service);
};
