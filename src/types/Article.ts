import { Comment } from './Comment';

export class Article {
  constructor(
    private _id: number,
    private _name: string,
    private _content: string,
    private _commentList: Array<Comment>
  ) {}

  public get id(): number {
    return this._id;
  }

  public set id(id: number) {
    this._id = id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get content(): string {
    return this._content;
  }

  public set content(content: string) {
    this._content = content;
  }

  public get commentList(): Array<Comment> {
    return this._commentList;
  }

  public set commentList(commentList: Array<Comment>) {
    this._commentList = commentList;
  }
}
