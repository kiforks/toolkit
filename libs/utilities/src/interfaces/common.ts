import { IntRange, Opaque } from './utils';

export type BooleanNumber = 0 | 1;

export type StateParams = Record<string, any>;

export type Ip = Opaque<'Ip', string>; // 127.0.0.1
export type Url = Opaque<'Url', string>;
export type HTMLString = Opaque<'HTMLString', string>;
export type JSONString = Opaque<'JSONString', string>;

export type ID = number | string;

export type DayNumber = IntRange<1, 32>;
export type MonthNumber = IntRange<1, 13>;

export type Position = 'bottom' | 'left' | 'right' | 'top';
export type Size = 'lg' | 'md' | 'sm' | 'xs';
export type Color = 'danger' | 'default' | 'info' | 'master' | 'neutral' | 'primary' | 'warning';
export type Breakpoint = 'lg' | 'md' | 'sm' | 'xl' | 'xs' | 'xxl';
