import { NodeProject } from "../javascript";
import { JsonFile } from "../json";

export interface TailwindJSONConfig {
  readonly purge?: string[];
  readonly darkMode?: boolean;
  readonly theme?: { [key: string]: any };
  readonly variants?: { [key: string]: string };
  readonly plugins?: string[];
  readonly content?: string[];
  readonly prefix?: string;
  readonly important?: boolean | string;
  readonly separator?: string;
  readonly corePlugings?: string[] | { [key: string]: boolean };
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
    const config = options?.config || ({} as TailwindJSONConfig);
    this.file = new JsonFile(project, this.fileName, {
      obj: {
        purge: [],
        darkMode: false,
        theme: {
          extend: {},
        },
        variants: {
          extend: {},
        },
        plugins: [],
        ...config,
      },
    });

    project.npmignore?.exclude(`/${this.fileName}`);
  }
}
