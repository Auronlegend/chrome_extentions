import { getNodesByFilter } from '../utils/Utils';

export type DOMTextReplacerFunction = (inputText: string) => string;
interface DOMTextReplacerFunctionWrapper {
  identifier: string
  lambda: DOMTextReplacerFunction
}

export class DOMTextReplacer {
  lambdas: DOMTextReplacerFunctionWrapper[];

  constructor () {
    this.lambdas = [];
  }

  public addFunction (identifier: string, lambda: DOMTextReplacerFunction): void {
    if (this.lambdas.find((el) => el.identifier === identifier) != null) {
      this.removeFunction(identifier);
    }
    this.lambdas.push({ identifier, lambda });
  }

  public removeFunction (identifier: string): void {
    this.lambdas = this.lambdas.filter((el) => el.identifier !== identifier);
  }

  public replaceInDocument (document: HTMLElement | Node): void {
    getNodesByFilter(document, 'SHOW_TEXT').forEach((element) => {
      if (element.nodeType === Node.TEXT_NODE) {
        element.textContent = this.executeLambdas(element.textContent ?? '');
      } else if (element.nodeType === Node.ELEMENT_NODE) {
        this.replaceInDocument(element);
      }
    });
  }

  private executeLambdas (text: string): string {
    let outText = text;
    for (const lambda of this.lambdas) {
      outText = lambda.lambda(outText);
    }
    return outText;
  }
}
