export type TSteps = 'start' | 'step1' | 'step2' | 'result'

export interface IStreamData {
  activeStep: TSteps
}