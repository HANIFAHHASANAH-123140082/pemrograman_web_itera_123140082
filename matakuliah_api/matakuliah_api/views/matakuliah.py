from pyramid.view import view_config
from pyramid.response import Response
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from ..models import Matakuliah
import json


@view_config(route_name='matakuliah_list', renderer='json', request_method='GET')
def matakuliah_list(request):
    """Get all matakuliah"""
    try:
        matakuliahs = request.dbsession.query(Matakuliah).all()
        return {
            'matakuliahs': [m.to_dict() for m in matakuliahs]
        }
    except SQLAlchemyError as e:
        return Response(
            json.dumps({'error': str(e)}),
            status=500,
            content_type='application/json',
            charset='utf-8'
        )


@view_config(route_name='matakuliah_detail', renderer='json', request_method='GET')
def matakuliah_detail(request):
    """Get one matakuliah by id"""
    try:
        id = int(request.matchdict['id'])
        matakuliah = request.dbsession.query(Matakuliah).filter(Matakuliah.id == id).first()
        
        if not matakuliah:
            return Response(
                json.dumps({'error': 'Matakuliah not found'}),
                status=404,
                content_type='application/json',
                charset='utf-8'
            )
        
        return matakuliah.to_dict()
    except ValueError:
        return Response(
            json.dumps({'error': 'Invalid ID'}),
            status=400,
            content_type='application/json',
            charset='utf-8'
        )
    except SQLAlchemyError as e:
        return Response(
            json.dumps({'error': str(e)}),
            status=500,
            content_type='application/json',
            charset='utf-8'
        )


@view_config(route_name='matakuliah_create', renderer='json', request_method='POST')
def matakuliah_create(request):
    """Create new matakuliah"""
    try:
        data = request.json_body
        
        # Validasi input
        required_fields = ['kode_mk', 'nama_mk', 'sks', 'semester']
        for field in required_fields:
            if field not in data:
                return Response(
                    json.dumps({'error': f'Missing field: {field}'}),
                    status=400,
                    content_type='application/json',
                    charset='utf-8'
                )
        
        # Buat matakuliah baru
        matakuliah = Matakuliah(
            kode_mk=data['kode_mk'],
            nama_mk=data['nama_mk'],
            sks=int(data['sks']),
            semester=int(data['semester'])
        )
        
        request.dbsession.add(matakuliah)
        request.dbsession.flush()
        
        return Response(
            json.dumps({
                'message': 'Matakuliah created successfully',
                'matakuliah': matakuliah.to_dict()
            }),
            status=201,
            content_type='application/json',
            charset='utf-8'
        )
    except IntegrityError:
        request.dbsession.rollback()
        return Response(
            json.dumps({'error': 'Kode MK already exists'}),
            status=400,
            content_type='application/json',
            charset='utf-8'
        )
    except (ValueError, KeyError) as e:
        return Response(
            json.dumps({'error': f'Invalid input: {str(e)}'}),
            status=400,
            content_type='application/json',
            charset='utf-8'
        )
    except SQLAlchemyError as e:
        request.dbsession.rollback()
        return Response(
            json.dumps({'error': str(e)}),
            status=500,
            content_type='application/json',
            charset='utf-8'
        )


@view_config(route_name='matakuliah_update', renderer='json', request_method='PUT')
def matakuliah_update(request):
    """Update matakuliah by id"""
    try:
        id = int(request.matchdict['id'])
        data = request.json_body
        
        matakuliah = request.dbsession.query(Matakuliah).filter(Matakuliah.id == id).first()
        
        if not matakuliah:
            return Response(
                json.dumps({'error': 'Matakuliah not found'}),
                status=404,
                content_type='application/json',
                charset='utf-8'
            )
        
        # Update fields if provided
        if 'kode_mk' in data:
            matakuliah.kode_mk = data['kode_mk']
        if 'nama_mk' in data:
            matakuliah.nama_mk = data['nama_mk']
        if 'sks' in data:
            matakuliah.sks = int(data['sks'])
        if 'semester' in data:
            matakuliah.semester = int(data['semester'])
        
        request.dbsession.flush()
        
        return {
            'message': 'Matakuliah updated successfully',
            'matakuliah': matakuliah.to_dict()
        }
    except IntegrityError:
        request.dbsession.rollback()
        return Response(
            json.dumps({'error': 'Kode MK already exists'}),
            status=400,
            content_type='application/json',
            charset='utf-8'
        )
    except (ValueError, KeyError) as e:
        return Response(
            json.dumps({'error': f'Invalid input: {str(e)}'}),
            status=400,
            content_type='application/json',
            charset='utf-8'
        )
    except SQLAlchemyError as e:
        request.dbsession.rollback()
        return Response(
            json.dumps({'error': str(e)}),
            status=500,
            content_type='application/json',
            charset='utf-8'
        )


@view_config(route_name='matakuliah_delete', renderer='json', request_method='DELETE')
def matakuliah_delete(request):
    """Delete matakuliah by id"""
    try:
        id = int(request.matchdict['id'])
        
        matakuliah = request.dbsession.query(Matakuliah).filter(Matakuliah.id == id).first()
        
        if not matakuliah:
            return Response(
                json.dumps({'error': 'Matakuliah not found'}),
                status=404,
                content_type='application/json',
                charset='utf-8'
            )
        
        request.dbsession.delete(matakuliah)
        request.dbsession.flush()
        
        return {
            'message': 'Matakuliah deleted successfully'
        }
    except SQLAlchemyError as e:
        request.dbsession.rollback()
        return Response(
            json.dumps({'error': str(e)}),
            status=500,
            content_type='application/json',
            charset='utf-8'
        )