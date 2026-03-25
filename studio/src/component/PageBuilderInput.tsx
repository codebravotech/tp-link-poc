import {Flex, Spinner} from '@sanity/ui'
import {useEffect, useState, useRef} from 'react'
import {ArrayOfObjectsInputProps, Image, useClient} from 'sanity'

/**
 * Hook that returns the previous value of a given value
 * @param value - The value to track
 * @returns The previous value
 */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>(undefined)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default usePrevious

export function keyBy<T extends Record<string, unknown>>(
  collection: Array<T>,
  iteratee: string | ((element: T) => string),
) {
  return collection.reduce(
    (result, element) => {
      // Determine the key: if iteratee is a string, use it as a property name; otherwise, call the function
      const key = (typeof iteratee === 'function' ? iteratee(element) : element[iteratee]) as string

      if (result[key] && Array.isArray(result[key])) {
        result[key].push(element)
      } else {
        result[key] = [element]
      }

      return result
    },
    {} as Record<string, T[]>,
  )
}

export function PageBuilderInput(props: ArrayOfObjectsInputProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [previewObjectsMap, setPreviewObjectsMap] = useState<Record<string, string> | undefined>(
    undefined,
  )
  const client = useClient({apiVersion: '2026-03-25'})
  const arrayOf = props.schemaType?.of || []
  const allPageBlockTypes = arrayOf.map((arrayMember) => arrayMember?.type?.name)
  const pageBlocksString = allPageBlockTypes?.join(',')
  const prevPageBlocksString = usePrevious(pageBlocksString)

  const previewConfigId = 'insertMenuPreview'

  useEffect(() => {
    const fetchPreviewObjects = async () => {
      try {
        const result: {component: string; assetUrl: string}[] = await client.fetch(
          `*[_type == $previewConfigId].previews[]{
            component, 
            "assetUrl": image.asset->url
          }`,
          {previewConfigId},
        )
        const map = (result || []).reduce(
          (acc, item) => {
            acc[item.component] = item.assetUrl
            return acc
          },
          {} as Record<string, string>,
        )

        setPreviewObjectsMap(map)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching insertMenuPreview documents:', error)
        setIsLoading(false)
      }
    }

    // Only fetch if we haven't yet
    if (!previewObjectsMap) {
      fetchPreviewObjects()
    }
  }, [previewObjectsMap, previewConfigId])

  const newProps = {
    ...props,
    schemaType: {
      ...props.schemaType,
      options: {
        ...props.schemaType?.options,
        insertMenu: {
          ...props.schemaType?.options?.insertMenu,
          views: (props.schemaType?.options?.insertMenu?.views || []).concat([
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName: string) => {
                // Return the URL directly from the map
                return previewObjectsMap?.[schemaTypeName] || ''
              },
            },
          ]),
        },
      },
    },
  }

  if (isLoading) {
    return (
      <Flex direction="row" align="center" justify="center" height="fill">
        <Spinner size={2} />
      </Flex>
    )
  }

  return props.renderDefault(newProps)
}
