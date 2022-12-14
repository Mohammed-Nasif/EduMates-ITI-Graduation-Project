import { createContext } from 'react';
export const TopicsContext = createContext();

export const TopicsContextProvider = ({ children }) => {
	const topicsOptions = [
		{ value: 1, label: 'javascript' },
		{ value: 2, label: 'python' },
		{ value: 3, label: 'java' },
		{ value: 4, label: 'c#' },
		{ value: 5, label: 'php' },
		{ value: 6, label: 'android' },
		{ value: 7, label: 'html' },
		{ value: 8, label: 'jquery' },
		{ value: 9, label: 'c++' },
		{ value: 10, label: 'css' },
		{ value: 11, label: 'ios' },
		{ value: 12, label: 'mysql' },
		{ value: 13, label: 'sql' },
		{ value: 14, label: 'node.js' },
		{ value: 15, label: 'react.js' },
		{ value: 16, label: 'c' },
		{ value: 17, label: 'asp.net' },
		{ value: 18, label: 'json' },
		{ value: 19, label: 'django' },
		{ value: 20, label: 'angular' },
		{ value: 21, label: 'ruby' },
		{ value: 22, label: 'ajax' },
		{ value: 23, label: 'linux' },
		{ value: 24, label: 'xml' },
		{ value: 25, label: 'database' },
		{ value: 26, label: 'larvel' },
		{ value: 27, label: 'typescript' },
		{ value: 28, label: 'monogodb' },
		{ value: 29, label: 'wordpress' },
		{ value: 30, label: 'git' },
		{ value: 31, label: 'bash' },
		{ value: 32, label: 'orcale' },
		{ value: 33, label: 'flutter' },
		{ value: 34, label: 'aws' },
		{ value: 35, label: 'firebase' },
		{ value: 36, label: 'azure' },
		{ value: 37, label: 'react native' },
		{ value: 38, label: 'docker' },
		{ value: 39, label: 'datastructue' },
		{ value: 40, label: 'algorithm' },
		{ value: 41, label: 'problemsolving' },
		{ value: 42, label: 'powershell' },
		{ value: 43, label: 'vue.js' },
		{ value: 44, label: 'bootstrap' },
		{ value: 45, label: 'performance' },
		{ value: 46, label: 'rest' },
		{ value: 47, label: 'express' },
		{ value: 48, label: 'unit-testing' },
		{ value: 49, label: 'oop' },
		{ value: 50, label: 'validation' },
		{ value: 51, label: 'Announcements' },
		{ value: 52, label: 'EduMates' },
		{ value: 53, label: 'Quotes' },
		{ value: 54, label: 'Opinions' },
	];

	return <TopicsContext.Provider value={{ topicsOptions }}>{children}</TopicsContext.Provider>;
};
