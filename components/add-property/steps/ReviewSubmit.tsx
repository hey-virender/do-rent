'use client'
import { Button } from '@/components/ui/button'
import { StepProps } from './step.type'
const ReviewSubmit = ({ onNext, onBack, isLast }: StepProps) => {
  return (
    <div><Button onClick={onBack}>Back</Button>
      <Button onClick={onNext}>{isLast ? 'Finish' : 'Next'}</Button></div>
  )
}

export default ReviewSubmit