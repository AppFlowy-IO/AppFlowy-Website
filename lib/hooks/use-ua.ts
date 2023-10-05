import { createContext } from 'react';
import UAParser from 'ua-parser-js';

export const UAContext = createContext<UAParser.IResult | undefined>(undefined);
