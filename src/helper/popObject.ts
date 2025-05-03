export function popObject<Obj extends object, K extends keyof Obj>(obj: Obj, ...keys: K[]): Pick<Obj, K> {
  const extracted = {} as Pick<Obj, K>;

  for (const k of keys) {
    extracted[k] = obj[k]; // lưu giá trị
    delete obj[k]; // xoá khỏi object gốc
  }

  return extracted;
}
