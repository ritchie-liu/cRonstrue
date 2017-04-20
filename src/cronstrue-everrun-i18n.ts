import { ExpressionDescriptor } from "./expressionDescriptor"
import { everRunLocalesLoader } from "./i18n/everRunLocalesLoader"

ExpressionDescriptor.initialize(new everRunLocalesLoader());
export default ExpressionDescriptor;

let toString = ExpressionDescriptor.toString;
export { toString };

