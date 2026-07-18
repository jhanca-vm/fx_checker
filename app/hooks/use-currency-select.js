import {
  autoUpdate,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation
} from '@floating-ui/react'
import { useRef, useState } from 'react'

export default function useCurrencySelect() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)

  const floating = useFloating({
    placement: 'bottom-end',
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate
  })

  const click = useClick(floating.context, { event: 'mousedown' })

  const dismiss = useDismiss(floating.context)

  const listRef = useRef([])

  const listNavigation = useListNavigation(floating.context, {
    listRef,
    focusItemOnHover: false,
    activeIndex,
    onNavigate: setActiveIndex
  })

  const interactions = useInteractions([click, dismiss, listNavigation])

  function close() {
    setIsOpen(false)
  }

  return { floating, interactions, isOpen, listRef, close }
}
