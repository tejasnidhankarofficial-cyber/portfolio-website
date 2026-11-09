import {
  SiPython, SiR, SiCplusplus, SiPytorch, SiTensorflow, SiScikitlearn, SiOpencv,
  SiNumpy, SiPandas, SiApachespark, SiFastapi, SiPostgresql, SiElasticsearch, SiDocker,
  SiGit, SiStreamlit, SiSqlalchemy, SiGradio, SiReact, SiTypescript, SiSqlite, SiClaude,
  SiModelcontextprotocol, SiYolo,
} from 'react-icons/si'
import { TbBrandOpenai, TbVectorTriangle, TbBinaryTree, TbNetwork, TbBrain } from 'react-icons/tb'
import {
  FaDatabase, FaAws, FaCube, FaProjectDiagram, FaSearch, FaSortAmountDown,
  FaCommentDots, FaShieldAlt, FaExchangeAlt,
} from 'react-icons/fa'

// key -> [component, brand colour]. Colours are the brands' own (lightened where a
// dark brand colour would vanish on the dark themes).
const map = {
  python: [SiPython, '#3776AB'], sql: [FaDatabase, '#F29111'], r: [SiR, '#2F7BDB'],
  cpp: [SiCplusplus, '#3B8BD4'], openai: [TbBrandOpenai, '#10A37F'],
  rag: [FaProjectDiagram, '#A78BFA'], embeddings: [TbVectorTriangle, '#22D3EE'],
  chroma: [FaCube, '#FFDE2D'], hybrid: [FaSearch, '#38BDF8'],
  rerank: [FaSortAmountDown, '#F472B6'], prompt: [FaCommentDots, '#34D399'],
  guardrails: [FaShieldAlt, '#F87171'], pytorch: [SiPytorch, '#EE4C2C'],
  tensorflow: [SiTensorflow, '#FF6F00'], sklearn: [SiScikitlearn, '#F7931E'],
  opencv: [SiOpencv, '#5C3EE8'], numpy: [SiNumpy, '#4DABCF'], pandas: [SiPandas, '#E70488'],
  spark: [SiApachespark, '#E25A1C'], fastapi: [SiFastapi, '#009688'],
  postgres: [SiPostgresql, '#5B8DEF'], sqlalchemy: [SiSqlalchemy, '#D71F00'],
  elastic: [SiElasticsearch, '#00BFB3'], rest: [FaExchangeAlt, '#60A5FA'],
  aws: [FaAws, '#FF9900'], docker: [SiDocker, '#2496ED'], git: [SiGit, '#F05032'],
  streamlit: [SiStreamlit, '#FF4B4B'], gradio: [SiGradio, '#FF7C00'],
  react: [SiReact, '#61DAFB'], typescript: [SiTypescript, '#3F8EE0'], sqlite: [SiSqlite, '#5B9FD1'],
  claude: [SiClaude, '#D97757'], mcp: [SiModelcontextprotocol, '#A78BFA'], yolo: [SiYolo, '#FFB400'],
  ast: [TbBinaryTree, '#34D399'], unet: [TbNetwork, '#A78BFA'], resnet: [TbBrain, '#F472B6'],
}

// project stack-tag label -> icon key (tags without an entry render text-only)
const TAG_ICONS = {
  Python: 'python', OpenAI: 'openai', Chroma: 'chroma', BM25: 'hybrid', FastAPI: 'fastapi',
  Streamlit: 'streamlit', Docker: 'docker', PostgreSQL: 'postgres', sqlglot: 'ast', MCP: 'mcp',
  Claude: 'claude', React: 'react', TypeScript: 'typescript', SQLite: 'sqlite', PyTorch: 'pytorch',
  'U-Net': 'unet', YOLOv8: 'yolo', OpenCV: 'opencv', Gradio: 'gradio', ResNet50: 'resnet',
}

export const tagIcon = (label) => TAG_ICONS[label]

export function Icon({ name }) {
  const [C, color] = map[name] || [FaCube, '#98a0b3']
  return <C aria-hidden="true" style={{ color }} />
}
