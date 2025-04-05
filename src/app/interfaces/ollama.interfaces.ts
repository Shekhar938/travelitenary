export interface GenerateRequest {
  model: string;
  prompt: string;
  images?: string[];
  format?: 'json' | string;
  options?: ModelOptions;
  system?: string;
  template?: string;
  context?: number[];
  stream?: boolean;
  raw?: boolean;
}

export interface ChatRequest {
  model: string;
  messages: ChatMessage[];
  format?: 'json' | string;
  options?: ModelOptions;
  stream?: boolean;
  keep_alive?: string;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  images?: string[];
  tool_calls?: any[];
}

export interface ModelOptions {
  temperature?: number;
  seed?: number;
  num_predict?: number;
  top_k?: number;
  top_p?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  stop?: string[];
}

export interface ModelResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context?: number[];
  total_duration?: number;
  load_duration?: number;
  prompt_eval_count?: number;
  eval_count?: number;
  eval_duration?: number;
}