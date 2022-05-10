import { NodeProject } from "../javascript";
import { JsonFile } from "../json";

export interface TailwindJSONConfig {
  purge?: string[];
  darkMode?: boolean;
  theme?: {
    extend: {}
  },
  variants?: {
    extend: {}
  },
  plugins?: string[],
  content?: string[],
  prefix?: string,
  important?: boolean | string,
  separator?: string,
  corePlugings?: string[] | {[key:string]: boolean},
}

export interface TailwindConfigOptions {
  /**
   * @default "tailwind.config.json"
   */
  readonly fileName?: string;
  readonly config?: TailwindJSONConfig;
}

/**
 * Declares a Tailwind CSS configuration file.
 *
 * There are multiple ways to add Tailwind CSS in your node project - see:
 * https://tailwindcss.com/docs/installation
 *
 * @see PostCss
 */
export class TailwindConfig {
  public readonly fileName: string;
  public readonly file: JsonFile;

  constructor(project: NodeProject, options?: TailwindConfigOptions) {
    this.fileName = options?.fileName ?? "tailwind.config.json";
    const config = options.config || {} as TailwindJSONConfig;
    this.file = new JsonFile(project, this.fileName, {
      obj: {
        purge:  [],
        darkMode: false,
        theme:  {
          extend: {},
        },
        variants: {
          extend: {},
        },
        plugins: [],
        ...config
      },
    });

    project.npmignore?.exclude(`/${this.fileName}`);
  }
}
