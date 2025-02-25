import './index.less';

import { useControllableValue } from 'ahooks';
import { Tooltip as BasicTooltip } from 'antd';
import { TooltipPropsWithOverlay, TooltipPropsWithTitle } from 'antd/es/tooltip';
import { useMemo, useState } from 'react';

interface TitleProps extends TooltipPropsWithTitle {
  onMouseEnter?: (e: any) => void;
  onlyEllipsis?: boolean;
}
interface OverlayProps extends TooltipPropsWithOverlay {
  onMouseEnter?: (e: any) => void;
  onlyEllipsis?: boolean;
}

type Props = TitleProps | OverlayProps;

export default function Tooltip(props: Props) {
  const { onMouseEnter, onlyEllipsis, children, ...setProps } = props;
  const [open, setOpen] = useControllableValue<boolean>(props, {
    valuePropName: 'open',
    trigger: 'onOpenChange',
  });
  const [canShowTooltip, setCanShowTooltip] = useState<boolean>(false);

  function showToolTip(e) {
    if (onlyEllipsis) {
      if (e.target.clientWidth >= e.target.scrollWidth) {
        setCanShowTooltip(false);
      } else {
        setCanShowTooltip(true);
      }
    }
    onMouseEnter?.(e);
  }

  const memoShowTooltip = useMemo(() => {
    if (onlyEllipsis) {
      return open && canShowTooltip;
    }
    return open;
  }, [open, canShowTooltip, onlyEllipsis]);

  return (
    <BasicTooltip {...setProps} open={memoShowTooltip} onOpenChange={setOpen}>
      <div className={'ant-cus-tooltip'} onMouseEnter={showToolTip}>
        {children}
      </div>
    </BasicTooltip>
  );
}
