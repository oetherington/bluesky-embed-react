import { AtpAgent } from "@atproto/api";
import { useBlueskyConfig } from "./useBlueskyConfig";

export type BlueskyClient = AtpAgent;

const agents = new Map<string, BlueskyClient>();

export const useBlueskyClient = (): BlueskyClient => {
	const {service} = useBlueskyConfig();
	let agent = agents.get(service);
	if (agent) {
		return agent;
	}
	agent = new AtpAgent({ service });
	agents.set(service, agent);
	return agent;
}
