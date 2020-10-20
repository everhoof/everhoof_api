import { Resolver } from '@nestjs/graphql';
import { UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';

@UseFilters(HttpExceptionFilter)
@Resolver('Roles')
export class RolesResolver {}
