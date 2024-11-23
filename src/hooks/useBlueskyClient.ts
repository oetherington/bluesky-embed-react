import { AtpAgent } from "@atproto/api";
import { useBlueskyConfig } from "./useBlueskyConfig";

const agents = new Map<string, AtpAgent>();

export const useBlueskyClient = (): AtpAgent => {
	const {service} = useBlueskyConfig();
	let agent = agents.get(service);
	if (agent) {
		return agent;
	}
	agent = new AtpAgent({ service });
	agents.set(service, agent);
	return agent;
}
