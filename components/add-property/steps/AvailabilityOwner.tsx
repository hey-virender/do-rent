'use client'
import { StepProps } from './step.type'
import { Button } from '@/components/ui/button'

const AvailabilityOwner = ({ onNext, onBack, isLast }:StepProps) => {
  return (
    <div>
      <Button onClick={onBack}>Back</Button>
      <Button onClick={onNext}>{isLast ? 'Finish' : 'Next'}</Button>
    </div>
  )
}

export default AvailabilityOwner