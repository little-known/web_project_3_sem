import type { Meta, StoryObj } from "@storybook/react";
import { CustomSelect } from "./CustomSelect";
import { useState } from "react";

interface CustomSelectProps {
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  placeholder?: string;
}

const meta: Meta<CustomSelectProps> = {
  title: "Components/CustomSelect",
  component: CustomSelect,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<CustomSelectProps>;

const Template = (args: CustomSelectProps) => {
  const [value, setValue] = useState(args.value);
  return (
    <CustomSelect
      {...args}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};

export const Default: Story = {
  render: Template,
  args: {
    value: "option1",
    options: [
      { value: "option1", label: "Опция 1" },
      { value: "option2", label: "Опция 2" },
      { value: "option3", label: "Опция 3" },
    ],
  },
};

export const WithPlaceholder: Story = {
  render: Template,
  args: {
    value: "",
    placeholder: "Выберите опцию",
    options: [
      { value: "option1", label: "Опция 1" },
      { value: "option2", label: "Опция 2" },
      { value: "option3", label: "Опция 3" },
    ],
  },
};

export const ManyOptions: Story = {
  render: Template,
  args: {
    value: "option1",
    options: [
      { value: "option1", label: "Опция 1" },
      { value: "option2", label: "Опция 2" },
      { value: "option3", label: "Опция 3" },
      { value: "option4", label: "Опция 4" },
      { value: "option5", label: "Опция 5" },
      { value: "option6", label: "Опция 6" },
      { value: "option7", label: "Опция 7" },
      { value: "option8", label: "Опция 8" },
    ],
  },
};

export const PlatformSelect: Story = {
  render: Template,
  args: {
    value: "Все",
    options: [
      { value: "Все", label: "Платформа" },
      { value: "PC", label: "PC" },
      { value: "PS", label: "PS" },
      { value: "Xbox", label: "Xbox" },
    ],
  },
};
