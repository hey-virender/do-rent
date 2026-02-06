export type StepProps = {
  mode: "create" | "edit";
  onNext: () => void;
  onBack?: () => void;
  isLast: boolean;
  isFirst?: boolean;
  
}