class OpenAIService {
  private apiKey: string;
  private assistantId: string;
  private baseUrl = 'https://api.openai.com/v1';
  private isConfigured: boolean;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    this.assistantId = import.meta.env.VITE_OPENAI_ASSISTANT_ID;
    this.isConfigured = !!(this.apiKey && this.assistantId);
    
    // Don't throw error on initialization, just mark as not configured
  }

  isReady(): boolean {
    return this.isConfigured;
  }

  private async fetchAPI(endpoint: string, options: RequestInit = {}) {
    if (!this.isConfigured) {
      throw new Error('OpenAI API key en Assistant ID zijn vereist');
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'OpenAI-Beta': 'assistants=v2',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API Error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  async createThread(): Promise<string> {
    if (!this.isConfigured) {
      throw new Error('OpenAI API key en Assistant ID zijn vereist');
    }

    const thread = await this.fetchAPI('/threads', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    return thread.id;
  }

  async addMessage(threadId: string, content: string): Promise<void> {
    if (!this.isConfigured) {
      throw new Error('OpenAI API key en Assistant ID zijn vereist');
    }

    await this.fetchAPI(`/threads/${threadId}/messages`, {
      method: 'POST',
      body: JSON.stringify({
        role: 'user',
        content: [
          {
            type: 'text',
            text: content,
          },
        ],
      }),
    });
  }

  async runAssistant(threadId: string): Promise<string> {
    if (!this.isConfigured) {
      throw new Error('OpenAI API key en Assistant ID zijn vereist');
    }

    const run = await this.fetchAPI(`/threads/${threadId}/runs`, {
      method: 'POST',
      body: JSON.stringify({
        assistant_id: this.assistantId,
      }),
    });
    return run.id;
  }

  async checkRunStatus(threadId: string, runId: string): Promise<string> {
    if (!this.isConfigured) {
      throw new Error('OpenAI API key en Assistant ID zijn vereist');
    }

    const run = await this.fetchAPI(`/threads/${threadId}/runs/${runId}`);
    return run.status;
  }

  async getMessages(threadId: string): Promise<any[]> {
    if (!this.isConfigured) {
      throw new Error('OpenAI API key en Assistant ID zijn vereist');
    }

    const response = await this.fetchAPI(`/threads/${threadId}/messages`);
    return response.data;
  }

  async waitForCompletion(threadId: string, runId: string): Promise<void> {
    if (!this.isConfigured) {
      throw new Error('OpenAI API key en Assistant ID zijn vereist');
    }

    let status = 'in_progress';
    
    while (status === 'in_progress' || status === 'queued') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      status = await this.checkRunStatus(threadId, runId);
    }
    
    if (status === 'failed') {
      throw new Error('Assistant run failed');
    }
  }
}

export const openAI = new OpenAIService();