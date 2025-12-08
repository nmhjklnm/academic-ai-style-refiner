/**
 * Pipeline 配置类型定义和加载器
 * 支持从静态 JSON 配置文件读取提示词和流程
 */

export interface StageConfig {
  id: string;
  name: string;
  description: string;
  model: string;  // 直接指定模型 ID
  prompt: string;
}

export interface PipelineSettings {
  temperature: number;
}

export interface ApiConfig {
  baseUrl: string;
  apiKey: string;
}

export interface PipelineConfig {
  name: string;
  description: string;
  version: string;
  stages: StageConfig[];
  settings: PipelineSettings;
  api: ApiConfig;
}

// 导入静态配置
import pipelineConfigJson from '../../pipeline.config.json';

// 类型断言并缓存配置
const pipelineConfig: PipelineConfig = pipelineConfigJson as PipelineConfig;

/**
 * 获取完整的 Pipeline 配置
 */
export function getPipelineConfig(): PipelineConfig {
  return pipelineConfig;
}

/**
 * 获取所有阶段配置
 */
export function getStages(): StageConfig[] {
  return pipelineConfig.stages;
}

/**
 * 根据阶段索引获取阶段配置（1-indexed，兼容旧代码）
 */
export function getStageByIndex(index: number): StageConfig | undefined {
  return pipelineConfig.stages[index - 1];
}

/**
 * 根据阶段 ID 获取阶段配置
 */
export function getStageById(id: string): StageConfig | undefined {
  return pipelineConfig.stages.find(stage => stage.id === id);
}

/**
 * 获取指定阶段的提示词（1-indexed，兼容旧代码）
 */
export function getPromptByIndex(index: number): string {
  const stage = getStageByIndex(index);
  return stage?.prompt ?? '';
}

/**
 * 获取阶段总数
 */
export function getStageCount(): number {
  return pipelineConfig.stages.length;
}

/**
 * 获取 Pipeline 设置
 */
export function getSettings(): PipelineSettings {
  return pipelineConfig.settings;
}

/**
 * 获取指定阶段的模型 ID（1-indexed）
 */
export function getModelForStage(stageIndex: number): string {
  const stage = getStageByIndex(stageIndex);
  return stage?.model ?? '';
}

/**
 * 获取 API 配置
 */
export function getApiConfig(): ApiConfig {
  return pipelineConfig.api;
}
